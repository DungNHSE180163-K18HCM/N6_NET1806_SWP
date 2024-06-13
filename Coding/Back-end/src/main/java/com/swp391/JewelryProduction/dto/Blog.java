package com.swp391.JewelryProduction.dto;

import com.swp391.JewelryProduction.pojos.Staff;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Blog {
    private String id;
    private String title;
    private Staff author;
    private List<ContentBlock> contents;
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ContentBlock {
        private String type;
        private String text;
        private String url;
        private String caption;
        private String altText;
    }

    public static class BlogBuilder {
        public BlogBuilder content(ContentBlock content) {
            if (this.contents == null) contents = new ArrayList<>();
            if (content != null)
                this.contents.add(content);
            return this;
        }

        public BlogBuilder tag(String tag) {
            if (this.contents == null) contents = new ArrayList<>();
            if (tag != null && !tag.isEmpty())
                this.tags.add(tag);
            return this;
        }
    }
}
