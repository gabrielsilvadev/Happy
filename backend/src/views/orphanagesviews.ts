import Orphanage from '../models/orphanage';
import Images from '../images_view/images_view';
export default {
    render(orphanage:Orphanage){
       return {
        id:orphanage.id,
        name:orphanage.name,
        latitude:orphanage.latitude,
        longitude:orphanage.longitude,
        about:orphanage.about,
        instructions:orphanage.instructions,
        open_on_hours:orphanage.open_on_hours,
        open_on_weeks:orphanage.open_on_weeks,
        images:Images.renderMany(orphanage.images)
       };
    },
    renderMany(orphanages:Orphanage[]){
      return orphanages.map(orphanage => this.render(orphanage));
    }
};