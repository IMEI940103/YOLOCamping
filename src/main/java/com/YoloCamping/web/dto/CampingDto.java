package com.YoloCamping.web.dto;

import com.YoloCamping.domain.product.Camping;
import com.YoloCamping.domain.product.Room;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
public class CampingDto {

    private Long campingNo;
    private String campingName; // 캠핑장명
    private String campingAddress;  // 주소
    private String campingInfo; // 상세설명
    private String campingImg;  // 이미지
    private String campingPhone; // 연락처
    private List<Room> rooms;   // 캠핑장 객실
    private List<RoomDto> roomDto;

    public CampingDto(Camping camping){
        this.campingNo = camping.getCampingNo();
        this.campingName = camping.getCampingName();
        this.campingAddress = camping.getCampingAddress();
        this.campingInfo = camping.getCampingInfo();
        this.campingImg = camping.getCampingImg();
        this.campingPhone = camping.getCampingPhone();
        this.rooms = camping.getRooms();
        this.roomDto = rooms.stream().map(RoomDto::new).collect(Collectors.toList());
    }

    public Camping toEntity(){
        return Camping.builder()
                .campingName(campingName)
                .campingAddress(campingAddress)
                .campingInfo(campingInfo)
                .campingImg("default.jpg")
                .campingPhone(campingPhone)
                .build();
    }

}
