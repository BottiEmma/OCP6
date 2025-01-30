package com.openclassrooms.mddapi.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class AllSubjectsResponse {
    private final List<SubjectResponse> subjects;
    public AllSubjectsResponse(final List<SubjectResponse> subjects) { this.subjects = subjects; }
}
