package com.YoloCamping.domain.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long>, BookingRepositoryImpl {

    // 시작일과 마지막날과 겹쳐지는 예약일 구하기.
    @Query("SELECT b FROM Booking b WHERE b.start < :end AND b.end > :start")
    List<Booking> findBySchedue(@Param("start") LocalDate start, @Param("end") LocalDate end);

    // 이름과 전화번호가 일치하는 예약리스트.
    @Query("SELECT b FROM Booking b WHERE b.userName = :name AND b.userPhone = :phone")
    List<Booking> findByConfirm(@Param("name")String name, @Param("phone")String phone);

    // 지난 3월간 예약수많은 room No값 구하기
    //@Query("SELECT b FROM Booking b WHERE b.start >= :start AND b.start <= end")
    //List<Booking> randomBooking(@Param("start")LocalDate start, @Param("end") LocalDate end);

}
