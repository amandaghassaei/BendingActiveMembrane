/**
 * Created by ghassaei on 11/7/16.
 */


function initBoundaryEditingView(globals){

    var nodesMetaTemplate = _.template("<% _.each(nodes, function(node, index){ %>" +
            '<div class="divInlineInputs nodeEntries">'+
                'Node <%= index + 1 %> : ' +
                    '<input placeholder="X" data-axis="x" data-index="<%= index%>" class="inlineInput nodePositionInput form-control" type="text" value="<%= node.position.x.toFixed(2) %>">' +
                    '<input placeholder="Y" data-axis="y" data-index="<%= index%>" class="inlineInput nodePositionInput form-control" type="text" value="<%= node.position.y.toFixed(2) %>">' +
                    '<input placeholder="Z" data-axis="z" data-index="<%= index%>" class="inlineInput nodePositionInput form-control" type="text" value="<%= node.position.z.toFixed(2) %>">' +
                    '<a href="#" data-index="<%=index%>" class="floatRight deleteNode deleteLink"><span class="fui-cross"></span></a>' +
            '</div>' +
            "<% });%>");
    var defaultMessageNodes = "Select nodes to set them as fixed.";

    return new (Backbone.View.extend({

        el: "#boundaryEditingControls",

        events: {
            "click .deleteNode": "deleteFixed",
            "change .nodePositionInput": "moveNode"
        },

        initialize: function(){

            setRadio("boundaryEditingMode", globals.get("boundaryEditingMode"), this.boundaryEditingModeChanged);

            this.listenTo(this.model, "change:numFixed", this.updateNumFixed);
            this.listenTo(this.model, "change:nodes", this.updateNodesMeta);
            this.updateNumFixed();

            this.listenTo(globals, "change:mode", function(){
                if (globals.get("mode") == "boundaryEditing"){
                    this.updateNodesMeta();
                }
            });
        },

        updateNumFixed: function(){
            $("#numFixed").html(this.model.get("numFixed"));
            this.updateNodesMeta();
        },

        updateNodesMeta: function(){
            if (this.model.get("numFixed") == 0){
                $("#fixedMeta").html(defaultMessageNodes);
                return;
            }
            var json = this.model.getFixedNodesJSON();
            $("#fixedMeta").html(nodesMetaTemplate(json));
        },

        deleteFixed:function(e){
            e.preventDefault();
            var index = parseInt($(e.target).parent().data("index"));
            if (isNaN(index)) return;
            globals.intersector3D.setHighlightedObj(null);
            var node = globals.structure.getAllFixedNodes()[index];
            this.model.toggleFixedState(node);
            globals.threeView.render();
        },

        moveNode: function(e){
            var $target = $(e.target);
            var index = $target.data("index");
            var val = parseFloat($target.val());
            if (isNaN(val)) return;
            var node = globals.structure.getAllFixedNodes()[index];
            var axis = $target.data("axis");
            globals.structure.moveFixedNode(node, val, axis);
        },

        boundaryEditingModeChanged: function(val){
            globals.set("boundaryEditingMode", val);
        }


    }))({model:globals.structure});
}