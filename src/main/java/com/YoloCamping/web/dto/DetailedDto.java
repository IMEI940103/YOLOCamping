package com.YoloCamping.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
        this.start = start;
        this.end = end;
    }

    @Builder
    public DetailedDto(String type, Long start, Long end){
        this.type = type;
        this.start = start;
        this.end = end;
    }
}
