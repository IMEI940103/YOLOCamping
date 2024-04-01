package com.YoloCamping.web.dto;

import com.YoloCamping.domain.dao.booking.Booking;
import com.YoloCamping.domain.dao.search.Camping;
import com.YoloCamping.domain.dao.search.Room;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RoomDto {

    private Long roomNo;
    private Long campingNo;
    private String roomName; // 객실명
    private String roomType; // 해당 방의 타입(ex. 글램핑,오토캠핑...)
    private int roomMin; //최소인원
    private int roomMax; //최대인원
    private int roomCount; // 객실총개수
    private int roomPrice; // 가격
    private String roomInfo; //소개글
    private String roomImg; //사진

    public RoomDto(Room room){
        this.roomNo = room.getRoomNo();
        this.roomName = room.getRoomName();
        this.roomType = room.getRoomType();
        this.roomMin = room.getRoomMin();
        this.roomMax = room.getRoomMax();
        this.roomCount = room.getRoomCount();
        this.roomPrice = room.getRoomPrice();
        this.roomInfo = room.getRoomInfo();
        this.roomImg = room.getRoomImg();
    }

    @Builder
    public Room toEntity(Camping camping){
        return Room.builder()
                .camping(camping)
                .roomName(roomName)
                .roomType(roomType)
                .roomMin(roomMin)
                .roomMax(roomMax)
                .roomCount(roomCount)
                .roomPrice(roomPrice)
                .roomInfo(roomInfo)
                .roomImg("default.png")
                .build();
    }

}
