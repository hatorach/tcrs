package com.hatorach.tcrs.dev;

import com.hatorach.tcrs.entity.Club;
import com.hatorach.tcrs.entity.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/**
 * Created by rainerh on 24.04.16.
 *
 * <p>adds fixture for development mode
 */
@Service
public class Fixturizer implements ApplicationListener<ContextRefreshedEvent> {
  @Autowired
  private MongoTemplate mongoTemplate;

  public void setMongoTemplate(MongoTemplate mongoTemplate) {
    this.mongoTemplate = mongoTemplate;
  }

  @Override public void onApplicationEvent(ContextRefreshedEvent cre) {
    Instant monday16 = ZonedDateTime.of(
      LocalDateTime.of(LocalDate.now().with(DayOfWeek.MONDAY), LocalTime.of(16, 0)),
      ZoneId.of("Europe/Vienna")
    ).toInstant();
    Reservation reservation = Reservation.builder().startDatetime(monday16).hours(2).build();
    mongoTemplate.save(reservation);


    Club tcGeorgeTown = Club.builder().name("TC GeorgeTown").url("tc-georg-town").build();
    Club askoIronCity = Club.builder().name("ASKO IronCity").url("asko-iron-city").build();
    mongoTemplate.save(tcGeorgeTown);
    mongoTemplate.save(askoIronCity);
  }

}
