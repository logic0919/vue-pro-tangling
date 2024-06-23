// 导入mysql
const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'my_royal',
})
// 搜索user表中的指定id对应的行的user_avatar值
const getUserAvatars = async (userIds) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, avatar FROM user WHERE id IN (?)';
    db.query(query, [[1]], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const userAvatars = {};
        results.forEach(row => {
          userAvatars[row.id] = row.avatar;
        });
        resolve(userAvatars);
      }
    });
  });
};
const getCommentsHandler = (req, res) => {
  const level = parseInt(req.query.level);
  const secondParam = parseInt(req.query.secondParam);
  if (isNaN(level) || isNaN(secondParam)) {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  if (level === 1) {
    db.query(
      `SELECT comments.*, user.avatar AS user_avatar, user.username AS username
     FROM comments
     JOIN user ON comments.user_id = user.id
     WHERE comments.royal_id = ? AND comments.parent IS NULL`,
      [secondParam],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
        results.map(result => {
          result.like_user = result.like_user.split(',').map(Number);
        });
        res.send({
          status: 0,
          message: '评论获取成功',
          data: results
        });
      }
    );
  } else if (level === 2) {
    db.query(
      `SELECT comments.*, user.avatar AS user_avatar, user.username AS username
     FROM comments
     JOIN user ON comments.user_id = user.id
     WHERE comments.parent = ?`,
      [secondParam],
      async (error, resultss) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }

        try {
          resultss.forEach(result => {
            result.like_user = result.like_user.split(',').map(Number);
          });

          res.send({
            status: 0,
            message: '评论获取成功',
            data: resultss
          });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    );
  }
}

const addCommentHandler = (req, res) => {
    const body=req.body
  let { level, royal, content, user, parent, at } = body
  console.log(user);
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
      console.log('err');
      res.status(500).json({ error: error.message });
      return;
    }

    const insertedCommentId = results.insertId;
    if (level === 2 || level === 3) {
      const updateResNumSql = 'UPDATE comments SET resNum = resNum + 1 WHERE id = ?';
      db.query(updateResNumSql, [parent], (updateError) => {
        if (updateError) {
          res.status(500).json({ error: updateError.message });
          return;
        }
      })
    }
    const fetchCommentSql = 'SELECT * FROM comments WHERE id = ?';
    db.query(fetchCommentSql, [insertedCommentId], (fetchError, fetchResults) => {
      if (fetchError) {
        res.status(500).json({ error: fetchError.message });
        return;
      }
      fetchResults[0].like_user=fetchResults[0].like_user.split(',');
      res.send({
        status: 0,
        message: '评论成功',
        data: fetchResults[0]
      })
    })
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
      
      res.send({
        status: 0,
        message: 'Comment liked successfully'
      })
    });
  });
}
const cancellikeHandler = (req, res) => {
  let { id, user_id } = req.body;
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
      res.send({
        status: 0,
        message: 'Comment unliked successfully'
      })
    });
  });
}
module.exports = { getCommentsHandler,addCommentHandler,likeHandler,cancellikeHandler }
