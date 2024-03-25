package com.YoloCamping.domain.dao.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long>, BookingRepositoryImpl {

    @Query("SELECT b FROM Booking b WHERE b.start < :end AND b.end > :start")
    List<Booking> findBySchedue(@Param("start") LocalDate start, @Param("end") LocalDate end);

    @Query("SELECT b FROM Booking b WHERE b.userName = :name AND b.userPhone = :phone")
    List<Booking> findByConfirm(@Param("name")String name, @Param("phone")String phone);

}
