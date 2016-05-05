package com.project.entitys;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class NoticeExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public NoticeExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andNIdIsNull() {
            addCriterion("n_id is null");
            return (Criteria) this;
        }

        public Criteria andNIdIsNotNull() {
            addCriterion("n_id is not null");
            return (Criteria) this;
        }

        public Criteria andNIdEqualTo(Integer value) {
            addCriterion("n_id =", value, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdNotEqualTo(Integer value) {
            addCriterion("n_id <>", value, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdGreaterThan(Integer value) {
            addCriterion("n_id >", value, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("n_id >=", value, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdLessThan(Integer value) {
            addCriterion("n_id <", value, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdLessThanOrEqualTo(Integer value) {
            addCriterion("n_id <=", value, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdIn(List<Integer> values) {
            addCriterion("n_id in", values, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdNotIn(List<Integer> values) {
            addCriterion("n_id not in", values, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdBetween(Integer value1, Integer value2) {
            addCriterion("n_id between", value1, value2, "nId");
            return (Criteria) this;
        }

        public Criteria andNIdNotBetween(Integer value1, Integer value2) {
            addCriterion("n_id not between", value1, value2, "nId");
            return (Criteria) this;
        }

        public Criteria andNContentIsNull() {
            addCriterion("n_content is null");
            return (Criteria) this;
        }

        public Criteria andNContentIsNotNull() {
            addCriterion("n_content is not null");
            return (Criteria) this;
        }

        public Criteria andNContentEqualTo(String value) {
            addCriterion("n_content =", value, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentNotEqualTo(String value) {
            addCriterion("n_content <>", value, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentGreaterThan(String value) {
            addCriterion("n_content >", value, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentGreaterThanOrEqualTo(String value) {
            addCriterion("n_content >=", value, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentLessThan(String value) {
            addCriterion("n_content <", value, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentLessThanOrEqualTo(String value) {
            addCriterion("n_content <=", value, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentLike(String value) {
            addCriterion("n_content like", value, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentNotLike(String value) {
            addCriterion("n_content not like", value, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentIn(List<String> values) {
            addCriterion("n_content in", values, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentNotIn(List<String> values) {
            addCriterion("n_content not in", values, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentBetween(String value1, String value2) {
            addCriterion("n_content between", value1, value2, "nContent");
            return (Criteria) this;
        }

        public Criteria andNContentNotBetween(String value1, String value2) {
            addCriterion("n_content not between", value1, value2, "nContent");
            return (Criteria) this;
        }

        public Criteria andNTitleIsNull() {
            addCriterion("n_title is null");
            return (Criteria) this;
        }

        public Criteria andNTitleIsNotNull() {
            addCriterion("n_title is not null");
            return (Criteria) this;
        }

        public Criteria andNTitleEqualTo(String value) {
            addCriterion("n_title =", value, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleNotEqualTo(String value) {
            addCriterion("n_title <>", value, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleGreaterThan(String value) {
            addCriterion("n_title >", value, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleGreaterThanOrEqualTo(String value) {
            addCriterion("n_title >=", value, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleLessThan(String value) {
            addCriterion("n_title <", value, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleLessThanOrEqualTo(String value) {
            addCriterion("n_title <=", value, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleLike(String value) {
            addCriterion("n_title like", value, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleNotLike(String value) {
            addCriterion("n_title not like", value, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleIn(List<String> values) {
            addCriterion("n_title in", values, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleNotIn(List<String> values) {
            addCriterion("n_title not in", values, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleBetween(String value1, String value2) {
            addCriterion("n_title between", value1, value2, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNTitleNotBetween(String value1, String value2) {
            addCriterion("n_title not between", value1, value2, "nTitle");
            return (Criteria) this;
        }

        public Criteria andNUsersIsNull() {
            addCriterion("n_users is null");
            return (Criteria) this;
        }

        public Criteria andNUsersIsNotNull() {
            addCriterion("n_users is not null");
            return (Criteria) this;
        }

        public Criteria andNUsersEqualTo(Integer value) {
            addCriterion("n_users =", value, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersNotEqualTo(Integer value) {
            addCriterion("n_users <>", value, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersGreaterThan(Integer value) {
            addCriterion("n_users >", value, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersGreaterThanOrEqualTo(Integer value) {
            addCriterion("n_users >=", value, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersLessThan(Integer value) {
            addCriterion("n_users <", value, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersLessThanOrEqualTo(Integer value) {
            addCriterion("n_users <=", value, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersIn(List<Integer> values) {
            addCriterion("n_users in", values, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersNotIn(List<Integer> values) {
            addCriterion("n_users not in", values, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersBetween(Integer value1, Integer value2) {
            addCriterion("n_users between", value1, value2, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNUsersNotBetween(Integer value1, Integer value2) {
            addCriterion("n_users not between", value1, value2, "nUsers");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeIsNull() {
            addCriterion("n_createTime is null");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeIsNotNull() {
            addCriterion("n_createTime is not null");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeEqualTo(Date value) {
            addCriterion("n_createTime =", value, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeNotEqualTo(Date value) {
            addCriterion("n_createTime <>", value, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeGreaterThan(Date value) {
            addCriterion("n_createTime >", value, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("n_createTime >=", value, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeLessThan(Date value) {
            addCriterion("n_createTime <", value, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeLessThanOrEqualTo(Date value) {
            addCriterion("n_createTime <=", value, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeIn(List<Date> values) {
            addCriterion("n_createTime in", values, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeNotIn(List<Date> values) {
            addCriterion("n_createTime not in", values, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeBetween(Date value1, Date value2) {
            addCriterion("n_createTime between", value1, value2, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNCreatetimeNotBetween(Date value1, Date value2) {
            addCriterion("n_createTime not between", value1, value2, "nCreatetime");
            return (Criteria) this;
        }

        public Criteria andNStateIsNull() {
            addCriterion("n_state is null");
            return (Criteria) this;
        }

        public Criteria andNStateIsNotNull() {
            addCriterion("n_state is not null");
            return (Criteria) this;
        }

        public Criteria andNStateEqualTo(Integer value) {
            addCriterion("n_state =", value, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateNotEqualTo(Integer value) {
            addCriterion("n_state <>", value, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateGreaterThan(Integer value) {
            addCriterion("n_state >", value, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateGreaterThanOrEqualTo(Integer value) {
            addCriterion("n_state >=", value, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateLessThan(Integer value) {
            addCriterion("n_state <", value, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateLessThanOrEqualTo(Integer value) {
            addCriterion("n_state <=", value, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateIn(List<Integer> values) {
            addCriterion("n_state in", values, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateNotIn(List<Integer> values) {
            addCriterion("n_state not in", values, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateBetween(Integer value1, Integer value2) {
            addCriterion("n_state between", value1, value2, "nState");
            return (Criteria) this;
        }

        public Criteria andNStateNotBetween(Integer value1, Integer value2) {
            addCriterion("n_state not between", value1, value2, "nState");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}