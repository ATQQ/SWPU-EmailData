# 反馈 feedback
|   字段    |     说明     |     类型     |    默认     |       描述       |        举例         |
| :-------: | :----------: | :----------: | :---------: | :--------------: | :-----------------: |
|    id     |     主键     |     int      | NN/UN/PK/AI |    主键/自增     |        0-xxx        |
| username  | 反馈者用户名 | varchar(20)  |     NN      |     工(学)号     |    201731061422     |
| replyuser | 回复者用户名 | varchar(20)  |      N      |       账号       |      20173ss22      |
|   email   |     邮箱     | varchar(128) |     NN      |     邮箱账号     |     xxxxx@q.com     |
|  problem  |     问题     | varchar(512) |     NN      |     问题内容     |     小试身手是      |
|  proImg   |   问题图片   | varchar(512) |      N      |  问题附带的图片  |   ["image1.png"]    |
|   reply   |     回复     | varchar(512) |      N      |    回复的内容    |    惺惺惜惺惺想     |
|  repImg   |  回复的图片  | varchar(512) |      N      | 回复的附带的图片 |   ["image1.png"]    |
|   date    |     日期     | varchar(512) |      N      |     问题日期     | 2019-01-01 09:01:31 |
|  status   |     状态     |     int      |     NN      |   是否已经回复   |  1:已回复 0:待回复  |