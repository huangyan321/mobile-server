const mongoose = require('mongoose')


const schema = mongoose.Schema({
  //英雄名称
  name: {
    type: String
  },
  //英雄头像
  avatar: {
    type: String
  },
  //英雄称号
  title: {
    type: String
  },
  //英雄评分
  scores: {
    //难度
    difficulty: {
      type: Number
    },
    //技巧
    skills: {
      type: Number
    },
    //攻击
    attack: {
      type: Number
    },
    //生存
    survive: {
      type: Number
    }
  },
  //技能
  skills: [{
    icon: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    tips: {
      type: String
    },
  }],
  //顺风出装
  itemsD: [{
    icon: {
      type: String
    },
    name: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item"
    }
  }],
  //逆风出装
  itemsU: [{
    icon: String,
    name: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item"
    }
  }],
  //使用提示
  usageTips: {
    type: String
  },
  //对抗提示
  battleTips: {
    type: String
  },
  //团战思路
  meleeTips: {
    type: String
  },
  //最佳搭档
  partner: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: {
      type: String
    }
  }]
})

module.exports = mongoose.model('Hero', schema)