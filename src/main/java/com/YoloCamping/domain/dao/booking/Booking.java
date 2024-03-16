package com.YoloCamping.domain.dao.booking;

import com.YoloCamping.domain.dao.search.Room;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Getter
@NoArgsConstructor
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingNo;

    @ManyToOne // Many - Booking, One - Room
    @JoinColumn(name="roomNo") //JoinColumn() 참조할시 칼럼명 설정.
    private Room room;

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
    public Booking(Room room, String userName, String userPhone, String payment, LocalDate start, LocalDate end, int price, int totalPrice) {
        this.room = room;
        this.userName = userName;
        this.userPhone = userPhone;
        this.payment = payment;
        this.start = start;
        this.end = end;
        this.price = price;
        this.totalPrice = totalPrice;
    }

}
