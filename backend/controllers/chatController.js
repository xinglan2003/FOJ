// backend/controllers/chatController.js
const { Friend, Group, GroupMember, User } = require('../models');

// 添加好友
exports.addFriend = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user.id;

  if (!friendId) {
    return res.status(400).json({ message: '好友ID是必填的。' });
  }

  try {
    const existingFriend = await Friend.findOne({ where: { userId, friendId } });
    if (existingFriend) {
      return res.status(400).json({ message: '好友请求已发送。' });
    }

    await Friend.create({ userId, friendId, status: 'pending' });
    res.status(201).json({ message: '好友请求已发送。' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 接受好友请求
exports.acceptFriend = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user.id;

  try {
    const friendship = await Friend.findOne({ where: { userId: friendId, friendId: userId, status: 'pending' } });
    if (!friendship) {
      return res.status(404).json({ message: '好友请求未找到。' });
    }

    friendship.status = 'accepted';
    await friendship.save();

    // 双向好友关系
    await Friend.create({ userId, friendId: friendId, status: 'accepted' });

    res.json({ message: '好友请求已接受。' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 创建群聊
exports.createGroup = async (req, res) => {
  const { name, memberIds } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({ message: '群聊名称是必填的。' });
  }

  try {
    const group = await Group.create({ name, ownerId: userId });
    await GroupMember.create({ groupId: group.id, userId: userId, role: 'owner' });

    if (memberIds && memberIds.length > 0) {
      for (const memberId of memberIds) {
        await GroupMember.create({ groupId: group.id, userId: memberId, role: 'member' });
      }
    }

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};
