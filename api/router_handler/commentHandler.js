// 导入mysql
const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'my_royal',
})
const getCommentsHandler = (req, res) => {
    const level = parseInt(req.query.level);
  const secondParam = parseInt(req.query.secondParam);

  if (isNaN(level) || isNaN(secondParam)) {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  if (level === 1) {
    db.query('SELECT * FROM comments WHERE royal_id = ? AND parent IS NULL', [secondParam], (error, results) => {
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    res.json(results);
    });

  } else if (level === 2) {
    db.query('SELECT * FROM comments WHERE parent = ?', [secondParam], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.json(results);
    });
  } else {
    res.status(400).json({ error: 'Invalid parameters' });
  }
}
const addCommentHandler = (req, res) => {
    const body=req.body
    let { level, royal, content, user, parent, at } = body
    level = Number(level)
    parent = Number(parent)
    at = Number(at)
    royal = Number(royal)

  if (!level || !royal || !content || !user) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
    }
    

  let sql;
  let params;

  if (level === 1) {
    sql = 'INSERT INTO comments (content, parent, at, user_id, royal_id, likes, like_user) VALUES (?, NULL, NULL, ?, ?, 0, "")';
    params = [content, user, royal];
  } else if (level === 2) {
    if (!parent) {
      res.status(400).json({ error: 'Missing parent field for level 2 comment' });
      return;
    }
    sql = 'INSERT INTO comments (content, parent, at, user_id, royal_id, likes, like_user) VALUES (?, ?, NULL, ?, ?, 0, "")';
    params = [content, parent, user, royal];
  } else if (level === 3) {
    if (!parent || !at) {
      res.status(400).json({ error: 'Missing parent or at field for level 3 comment' });
      return;
    }
    sql = 'INSERT INTO comments (content, parent, at, user_id, royal_id, likes, like_user) VALUES (?, ?, ?, ?, ?, 0, "")';
    params = [content, parent, at, user, royal];
  } else {
    res.status(400).json({ error: 'Invalid level value' });
    return;
  }

  db.query(sql, params, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json({ message: 'Comment added successfully', commentId: results.insertId });
  });
}
const likeHandler = (req,res) => {
    let { id, user_id } = req.body;

  if (!id || !user_id) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

    id = Number(id)
    user_id = Number(user_id)
  db.query('SELECT like_user FROM comments WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    let likeUser = results[0].like_user ? results[0].like_user.split(',') : [];

    if (likeUser.includes(String(user_id))) {
      res.status(400).json({ error: 'User has already liked this comment' });
      return;
    }

    likeUser.push(String(user_id));
    const newLikeUser = likeUser.join(',');

    db.query('UPDATE comments SET likes = likes + 1, like_user = ? WHERE id = ?', [newLikeUser, id], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(200).json({ message: 'Comment liked successfully' });
    });
  });
}
const canclelikeHandler = (req, res) => {
    let { id, user_id } = req.body;

    id = Number(id)
    user_id = Number(user_id)
  if (!id || !user_id) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.query('SELECT like_user FROM comments WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    let likeUser = results[0].like_user ? results[0].like_user.split(',') : [];

    if (!likeUser.includes(String(user_id))) {
      res.status(400).json({ error: 'User has not liked this comment' });
      return;
    }

    likeUser = likeUser.filter(user => user !== String(user_id));
    const newLikeUser = likeUser.join(',');

    db.query('UPDATE comments SET likes = likes - 1, like_user = ? WHERE id = ?', [newLikeUser, id], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(200).json({ message: 'Comment unliked successfully' });
    });
  });
}
module.exports = { getCommentsHandler,addCommentHandler,likeHandler,canclelikeHandler }
