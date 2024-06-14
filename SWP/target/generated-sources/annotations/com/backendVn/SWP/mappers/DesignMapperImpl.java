package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.DesignCreationRequest;
import com.backendVn.SWP.dtos.request.DesignUpdateRequest;
import com.backendVn.SWP.dtos.response.DesignResponse;
import com.backendVn.SWP.entities.Design;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class DesignMapperImpl implements DesignMapper {

    @Override
    public Design toDesign(DesignCreationRequest designCreationRequest) {
        if ( designCreationRequest == null ) {
            return null;
        }

        Design design = new Design();

        design.setDesignName( designCreationRequest.getDesignName() );

        return design;
    }

    @Override
    public void updateDesign(Design design, DesignUpdateRequest designUpdateRequest) {
        if ( designUpdateRequest == null ) {
            return;
        }

        design.setDesignName( designUpdateRequest.getDesignName() );
        design.setDescription( designUpdateRequest.getDescription() );
        design.setURLImage( designUpdateRequest.getURLImage() );
    }

    @Override
    public DesignResponse toDesignResponse(Design request) {
        if ( request == null ) {
            return null;
        }

        DesignResponse.DesignResponseBuilder designResponse = DesignResponse.builder();

        designResponse.id( request.getId() );
        designResponse.designName( request.getDesignName() );
        designResponse.description( request.getDescription() );

        return designResponse.build();
    }
}
