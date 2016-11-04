/**
 * Created by ghassaei on 11/2/16.
 */

function initGlobals(){

    return new (Backbone.Model.extend({

        defaults: {
            mode: "meshEditing",

            snapToVertex: true
        },

        initialize: function(){
            this.threeView = initThreeView(this);
            this.mesh = initMesh(this);
            this.structure = initStructure(this);
            initView(this);
            initMeshEditingView(this);
            initBeamEditingView(this);
            initMembraneEditingView(this);
        }

    }))();
}