package com.YoloCamping.domain.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

// DBLayer접근 설정. <Entity클래스, PK타입>
// Entity클래스와 같은 위치에 있어야함.
public interface CampingRepository extends JpaRepository<Camping, Long> ,CampingRepositoryImpl{

    /*
        distinct 결과값 중복제거
        IN, ANY 다수의 값과 비교. OR연산
        *** IN과 ANY의 차이점 ***
         ANY 비교연산자를 사용함. =ANY, >ANY, <ANY
        ALL 모든조건에 만족. AND연산 *** ALL도 ANY와 같이 비교연산자사용 ***

     */

    //@Query("SELECT c FROM Camping c WHERE c.campingNo =ANY (SELECT distinct r.camping FROM Room r WHERE r.roomType = :type)")
    @Query("SELECT c FROM Camping c WHERE c.campingNo IN (SELECT distinct r.camping FROM Room r WHERE r.roomType = :type)")
    List<Camping> findByCampingType(@Param("type") String type);

    @Query("SELECT c FROM Camping c WHERE c.campingPet = 1")
    List<Camping> findByCampingPet();

    @Query("SELECT c FROM Camping c WHERE c.campingName = :name")
    Camping findByCampingName(@Param("name") String campingName);

    @Query("SELECT count(c) FROM Camping c")
    int countByCamping();

    @Query("SELECT c FROM Camping c WHERE c.campingNo = :no1 OR c.campingNo = :no2 OR c.campingNo =  :no3 OR c.campingNo =  :no4")
    List<Camping> recommend_Camping(@Param("no1") int len1,@Param("no2") int len2,@Param("no3") int len3,@Param("no4") int len4);

}
