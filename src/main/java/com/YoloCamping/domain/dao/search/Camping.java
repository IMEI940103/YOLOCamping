package com.YoloCamping.domain.dao.search;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Camping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long campingNo;

    @Column//(unique = true) // Unique 설정
    private String campingNumber; //사업자등록번호

    @Column
    private String campingName; //이름

    @Column
    private String campingAddress; //주소

    @Column
    private String campingGround; //주변지형

    @Column
    private int campingPet; // 반려동물

    @Column
    private String campingInfo; //소개글

    @Column
    private String campingImg;  //사진

    @Column
    private String campingPhone; //연락처

    @OneToMany(mappedBy = "camping")
    private List<Room> rooms = new ArrayList<>(); // campings Table에는 존재하지않지만 campings에 속하는 rooms을 객체안에 저장

    @Builder
    public Camping(String campingNumber, String campingName, String campingAddress,
                   String campingGround, int campingPet, String campingInfo,
                   String campingImg, String campingPhone, List<Room> rooms){
        this.campingName = campingName;
        this.campingPhone = campingPhone;
        this.campingInfo = campingInfo;
        this.campingImg = campingImg;
        this.campingGround = campingGround;
        this.campingAddress = campingAddress;
        this.campingNumber = campingNumber;
        this.campingPet = campingPet;
        this.rooms = rooms;
    }

    public void update(String campingInfo, String campingPhone){
        this.campingInfo = campingInfo;
        this.campingPhone = campingPhone;
    }
}
