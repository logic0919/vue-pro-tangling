参数：tel+pwd+QQ+name+lesson+direction+gender

status为1表示失败

参数格式：
tel:11位数字
pwd:6-16位字母数字下划线（正则中\w）
QQ:待确认
name:2-10汉字
lesson:无
gender:无（非必需）
direction:无


POST报名：/register
    参数：手机号+密码+QQ+姓名+班级+方向+性别（非必需）
    
POST登录：/login
    参数：手机号+密码
    返回：token（localStorage）

GET获取个人信息：/infoGet
    参数：token
    返回的信息：手机号+QQ+姓名+班级+性别+方向+状态

POST修改个人信息：/infoChange
    参数：token+QQ+姓名+班级+方向+性别

可有可无：
POST修改密码：/pwdChange



现在的疑惑：
1.重复注册同一个账号时会报错“账号已被占用”，然后服务器就会卡死，得关掉然后重新启动服务器
  但是其他问题如数据库操作上出现问题顶多报错但不至于服务器卡死