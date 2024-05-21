package com.YoloCamping.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class DetailedDto {

    private String area;

    private String type;

    //@JsonFormat(pattern = "yyyy.MM.dd")
    //@Temporal(TemporalType.DATE)
    private Long start;

    //@JsonFormat(pattern = "yyyy.MM.dd")
    //@Temporal(TemporalType.DATE)
    private Long end;

    @Builder
    public DetailedDto(String area, String type, Long start, Long end){
        this.area = area;
        this.type = type;

        LocalDate date = LocalDate.now();
        Date today = new Date(date.getYear(),date.getMonthValue()-1,date.getDayOfMonth());
        Date tomorrow = new Date(date.getYear(),date.getMonthValue()-1,date.getDayOfMonth()+1);

        if(start == null){ start = today.getTime(); }
        if(end == null){ end = tomorrow.getTime(); }

        this.start = start;
        this.end = end;

    }

}
