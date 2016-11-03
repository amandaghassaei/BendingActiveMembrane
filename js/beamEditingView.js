/**
 * Created by ghassaei on 11/3/16.
 */


function initBeamEditingView(globals){

    return new (Backbone.View.extend({

        el: "#beamEditingControls",

        events: {
        },

        initialize: function(){

            _.bindAll(this, "snapToVertexChanged");
            setCheckbox("#snapToVertex", globals.get("snapToVertex"), this.snapToVertexChanged);

            this.listenTo(this.model, "change:beams", this.updateNumBeams);
            this.updateNumBeams();
        },

        updateNumBeams: function(){
            $("#numBeams").html(this.model.getNumBeams());
        },

        snapToVertexChanged: function(state){
            globals.set("snapToVertex", state);
        }

    }))({model:globals.structure});
}