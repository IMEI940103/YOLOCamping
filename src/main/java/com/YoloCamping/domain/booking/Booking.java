package com.YoloCamping.domain.booking;

import com.YoloCamping.domain.BaseEntityTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Getter
@NoArgsConstructor
@Entity
public class Booking extends BaseEntityTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingNo;

    private Long roomNo;

    @Column
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDate start; // 예정 입실일

    @Column
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDate end; // 예정 퇴실일

    @Column
    private String userName; // 예약자이름

    @Column
    private String userPhone; // 예약자연락처

//    @Column
//    private String condition; // 예약상황

    @Column
    private String payment; // 결제수단

    @Column
    private int price; // 가격

    @Column
    private int totalPrice;

    @Builder
    public Booking(Long roomNo, String userName, String userPhone, String payment, LocalDate start, LocalDate end, int price, int totalPrice) {
        this.roomNo = roomNo;
        this.userName = userName;
        this.userPhone = userPhone;
        this.payment = payment;
        this.start = start;
        this.end = end;
        this.price = price;
        this.totalPrice = totalPrice;
    }

}
