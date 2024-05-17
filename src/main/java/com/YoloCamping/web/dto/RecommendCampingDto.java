package com.YoloCamping.web.dto;

import com.YoloCamping.domain.product.Camping;
import com.YoloCamping.domain.product.Room;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class RecommendCampingDto { // 메인페이지의 추천캠핑장리스트

    private Long campingNo;
    private String campingName; // 캠핑장명
    private String campingAddress;  // 주소
    private String campingInfo; // 상세설명
    private String campingImg;  // 이미지
    private String campingPhone; // 연락처

    public RecommendCampingDto(Camping camping){
        this.campingNo = camping.getCampingNo();
        this.campingName = camping.getCampingName();
        this.campingAddress = camping.getCampingAddress();
        this.campingInfo = camping.getCampingInfo();
        this.campingImg = camping.getCampingImg();
        this.campingPhone = camping.getCampingPhone();
    }
}
