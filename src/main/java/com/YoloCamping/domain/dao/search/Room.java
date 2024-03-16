package com.YoloCamping.domain.dao.search;

import com.YoloCamping.domain.dao.booking.Booking;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomNo;

    @ManyToOne // Many - Room(캠핑장의 방), One - Camping(캠핑장) 하나의 캠핑장은 여러개의 룸을 가진다.
    @JoinColumn(name="campingNo")
    private Camping camping; // class - Camping 의 PK인 campingNo을 FK로 설정함.

    @Column
    private String roomName;

    @Column
    private String roomType; // 해당 방의 타입(ex. 글램핑,오토캠핑...)

    @Column
    private int roomMin; //최소인원

    @Column
    private int roomMax; //최대인원

    @Column
    private int roomCount; //방개수

    @Column
    private int roomPrice; // 가격

    @Column
    private String roomInfo; //소개글

    @Column
    private String roomImg; //사진

    @OneToMany(mappedBy = "room")
    private List<Booking> bookings = new ArrayList<>(); // Table에는 존재하지않지만 테이블에 속하는 객체안에 저장

    @Builder
    public Room(Camping camping, String roomName, String roomType,
                int roomMin, int roomMax, int roomCount, int roomPrice,
                String roomInfo, String roomImg){
        this.camping = camping;
        this.roomName = roomName;
        this.roomType = roomType;
        this.roomMin = roomMin;
        this.roomMax = roomMax;
        this.roomCount = roomCount;
        this.roomPrice = roomPrice;
        this.roomInfo = roomInfo;
        this.roomImg = roomImg;
    }

    public void update(String roomName, String roomType, String roomInfo,
                       int roomMin, int roomMax, int roomPrice, int roomCount){
        this.roomName = roomName;
        this.roomType = roomType;
        this.roomInfo = roomInfo;
        this.roomMin = roomMin;
        this.roomMax = roomMax;
        this.roomCount = roomCount;
        this.roomPrice = roomPrice;
    }

}
