package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.request.MaterialRequest;
import com.backendVn.SWP.dtos.response.MaterialResponse;
import com.backendVn.SWP.entities.Material;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class MaterialMapperImpl implements MaterialMapper {

    @Override
    public Material toMaterial(MaterialRequest material) {
        if ( material == null ) {
            return null;
        }

        Material material1 = new Material();

        material1.setType( material.getType() );
        material1.setPricePerUnit( material.getPricePerUnit() );
        material1.setMaterialName( material.getMaterialName() );

        return material1;
    }

    @Override
    public MaterialResponse toMaterialResponse(Material material) {
        if ( material == null ) {
            return null;
        }

        MaterialResponse.MaterialResponseBuilder materialResponse = MaterialResponse.builder();

        materialResponse.id( material.getId() );
        materialResponse.type( material.getType() );
        materialResponse.pricePerUnit( material.getPricePerUnit() );
        materialResponse.materialName( material.getMaterialName() );

        return materialResponse.build();
    }

    @Override
    public void updateMaterial(Material material, MaterialRequest materialRequest) {
        if ( materialRequest == null ) {
            return;
        }

        material.setType( materialRequest.getType() );
        material.setPricePerUnit( materialRequest.getPricePerUnit() );
        material.setMaterialName( materialRequest.getMaterialName() );
    }
}
