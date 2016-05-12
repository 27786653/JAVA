package com.redis.Interceptor;

import java.io.Serializable;
import java.util.concurrent.TimeUnit;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

/**
 * Created by 李森林 on 2016/5/12.
 */
public class MethodCacheInterceptor implements MethodInterceptor {

    private RedisTemplate<Serializable, Object> redisTemplate;
    private Long defaultCacheExpireTime = 10l; // 缓存默认的过期时间,这里设置了10秒

    public Object invoke(MethodInvocation invocation) throws Throwable {
        Object value = null;

        String targetName = invocation.getThis().getClass().getName();    //类的全路径名
        String methodName = invocation.getMethod().getName();             //调用的方法名

        Object[] arguments = invocation.getArguments();                   //传递的参数值
        String key = getCacheKey(targetName, methodName, arguments);      //组装key

        try {
            // 判断是否有缓存
            if (exists(key)) {
                return getCache(key);
            }
            // 写入缓存
            value = invocation.proceed();                                //调用方法
            if (value != null) {
                final String tkey = key;                                 //存redis的key
                final Object tvalue = value;                             //存redis的value
                new Thread(new Runnable() {
                    public void run() {
                        setCache(tkey, tvalue, defaultCacheExpireTime);     //设置缓存并且设置超时时间
                    }
                }).start();
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (value == null) {
                return invocation.proceed();
            }
        }
        return value;
    }

    /**
     * 创建缓存key
     *
     * @param targetName
     * @param methodName
     * @param arguments
     */
    private String getCacheKey(String targetName, String methodName,
                               Object[] arguments) {
        StringBuffer sbu = new StringBuffer();
        sbu.append(targetName).append("_").append(methodName);
        if ((arguments != null) && (arguments.length != 0)) {
            for (int i = 0; i < arguments.length; i++) {
                sbu.append("_").append(arguments[i]);
            }
        }
        return sbu.toString();
    }

    /**
     * 判断缓存中是否有对应的value
     *
     * @param key
     * @return
     */
    public boolean exists(final String key) {
        return redisTemplate.hasKey(key);
    }

    /**
     * 读取缓存
     *
     * @param key
     * @return
     */
    public Object getCache(final String key) {
        Object result = null;
        ValueOperations<Serializable, Object> operations = redisTemplate
                .opsForValue();
        result = operations.get(key);
        return result;
    }

    /**
     * 写入缓存
     *
     * @param key
     * @param value
     * @return
     */
    public boolean setCache(final String key, Object value, Long expireTime) {
        boolean result = false;
        try {
            ValueOperations<Serializable, Object> operations = redisTemplate
                    .opsForValue();
            operations.set(key, value);
            redisTemplate.expire(key, expireTime, TimeUnit.SECONDS);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public void setRedisTemplate(
            RedisTemplate<Serializable, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
}