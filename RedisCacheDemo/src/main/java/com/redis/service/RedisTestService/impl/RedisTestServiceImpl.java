package com.redis.service.RedisTestService.impl;

import com.redis.service.RedisTestService.RedisTestService;
import org.springframework.stereotype.Service;

/**
 * Created by 李森林 on 2016/5/12.
 */
@Service
public class RedisTestServiceImpl implements RedisTestService {

    public String getTimestamp(String param) {
        Long timestamp = System.currentTimeMillis();
        return timestamp.toString();
    }

}