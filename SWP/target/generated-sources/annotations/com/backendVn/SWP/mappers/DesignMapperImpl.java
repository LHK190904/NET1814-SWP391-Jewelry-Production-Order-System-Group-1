package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.DesignCreationRequest;
import com.backendVn.SWP.dtos.request.DesignUpdateRequest;
import com.backendVn.SWP.dtos.response.DesignResponse;
import com.backendVn.SWP.entities.Design;
import java.util.ArrayList;
import java.util.List;
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

        Design.DesignBuilder design = Design.builder();

        design.designName( designCreationRequest.getDesignName() );
        design.description( designCreationRequest.getDescription() );

        return design.build();
    }

    @Override
    public void updateDesign(Design design, DesignUpdateRequest designUpdateRequest) {
        if ( designUpdateRequest == null ) {
            return;
        }

        design.setDesignName( designUpdateRequest.getDesignName() );
        design.setDescription( designUpdateRequest.getDescription() );
    }

    @Override
    public DesignResponse toDesignResponse(Design request, List<String> listURLImage) {
        if ( request == null && listURLImage == null ) {
            return null;
        }

        DesignResponse.DesignResponseBuilder designResponse = DesignResponse.builder();

        if ( request != null ) {
            designResponse.id( request.getId() );
            designResponse.designName( request.getDesignName() );
            designResponse.description( request.getDescription() );
        }
        List<String> list = listURLImage;
        if ( list != null ) {
            designResponse.listURLImage( new ArrayList<String>( list ) );
        }

        return designResponse.build();
    }
}
