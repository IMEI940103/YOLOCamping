package com.YoloCamping.web.dto;

import com.YoloCamping.domain.booking.Booking;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class BookingDto {

    private Long roomNo;
    private String userName; // 예약자이름
    private String userPhone; // 예약자연락처
//    private String condition; // 예약상황
    private String payment; // 결제수단

    @JsonFormat(pattern = "yyyy.MM.dd")
    @Temporal(TemporalType.DATE)
    private LocalDate start; // 예정 입실일

    @JsonFormat(pattern = "yyyy.MM.dd")
    @Temporal(TemporalType.DATE)
    private LocalDate end; // 예정 퇴실일

    private int price; // 1박 결제금액
    private int totalPrice; // 총 결제금액

    public BookingDto(Booking booking){
        this.roomNo = booking.getRoomNo();
        this.userName = booking.getUserName();
        this.userPhone = booking.getUserPhone();
        this.payment = booking.getPayment();
        this.start = booking.getStart();
        this.end = booking.getEnd();
        this.price = booking.getPrice();
        this.totalPrice = booking.getTotalPrice();
    }

    public Booking toEntity(){
        return Booking.builder()
                .roomNo(roomNo)
                .end(end)
                .start(start)
                .totalPrice(totalPrice)
                .price(price)
                .payment(payment)
                .userName(userName)
                .userPhone(userPhone)
                .build();
    }

}
