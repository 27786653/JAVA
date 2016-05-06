package com.lsl.bizimpl;

import java.util.List;

import com.lsl.biz.AnnouncementBiz;
import com.lsl.biz.UsersBiz;
import com.lsl.dao.AnnouncementDao;
import com.lsl.dao.UsersDao;
import com.lsl.entity.Announcement;
import com.lsl.entity.Users;


public class AnnouncementBizimpl  implements AnnouncementBiz{
		
		private AnnouncementDao ad;
		
		public AnnouncementDao getad() {
			return ad;
		}

		public void setad(AnnouncementDao ad) {
			this.ad = ad;
		}

		public Announcement getById(int id) {
			// TODO Auto-generatad method stub
			return ad.getById(id);
		}

		public List<Announcement> getList(int page,int rows) {
			// TODO Auto-generatad method stub
			return ad.getList(page,rows);
		}

		public void delete(Announcement t) {
			// TODO Auto-generatad method stub
			ad.delete(t);
		}

		public void update(Announcement t) {
			// TODO Auto-generatad method stub
			ad.update(t);
		}

		public void add(Announcement t) {
			// TODO Auto-generatad method stub
			ad.add(t);
		}

		public int count(String id) {
			// TODO Auto-generatad method stub
			return ad.count(id);
		}

		
		

}
