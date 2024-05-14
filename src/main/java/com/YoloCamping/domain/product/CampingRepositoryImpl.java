package com.YoloCamping.domain.product;


import java.util.List;


//custom Repository 생성시 ---RespositoryImpl 형식으로 만들것.
public interface CampingRepositoryImpl {

    //결과값이 여러개의 class로 구성될경우 List<E>로 return 설정.
    List<Camping> findByCampingType(String type);

    List<Camping> findByCampingPet();

    Camping findByCampingName(String campingName);

    Long countByCamping();

    List<Camping> recommend_Camping(int a, int b, int c, int d);

}
