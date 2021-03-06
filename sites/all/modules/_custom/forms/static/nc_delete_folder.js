/**
 * Created by RiteshSamala on 7/1/16.
 */
jQuery(document).ready(function($) {
    $('#deleteFolderModal').on('shown.bs.modal', function () {
        // do something…
        console.log("now I can show the expanded private and shared list");
        $("h2[data-folder='private']").next().slideDown();
        $("h2[data-folder='private']").addClass("current");
        $("h2[data-folder='Shared By Me']").next().slideDown();
        $("h2[data-folder='Shared By Me']").addClass("current");
        $("h2[data-folder='Shared With Me']").next().slideDown();
        $("h2[data-folder='Shared With Me']").addClass("current");
    });


    $('#deleteConfirm').click(function(e) {
        //console.log("confirm delete");
        //program to decode the deleted checks and sending
        var folders = [];
        var models = {};
        var sharedFolders =[];
        var owner=$('#dragoon_ncDelFolder_form input[name=owner]').val();
        
        $("#dragoon_ncDelFolder_form input:checkbox:checked").each(function(key,value) {
            var str = value.name;
            console.log(str);
            var str_array=str.split('-');
            if(str_array[0]=="fo"){
                //push intlo folder array
                var filter = str_array[1];
                
                if(filter == "private"){
                    filter = owner+"-private";
                    folders.push(filter);
                }else{
                    // shared folder
                    if(filter.search(" by ") >=0 && filter.search(" by ")+4 < filter.length){
                        var folder_owner = filter.substring(filter.search(" by ")+4);
                    }
                    if ( folder_owner && folder_owner !== ""){
                        filter = filter.substring(0,filter.search(" by "))+"-"+folder_owner;
                        sharedFolders.push(filter);
                    }else{
                        filter = filter+"-"+owner;  
                        folders.push(filter);  
                    }
                    
                }

            }
            else if(str_array[0]=="mo"){
                var filter = str_array[3];
                if(filter == "private")
                    filter = owner+"-private";
                else
                    filter = filter+"-"+owner;

                models[str_array[1]]=filter;
            }
        });
        var data = {};
        if(Object.keys(folders).length>0){
            data.folders = folders;
        }
        if(Object.keys(models).length>0){
            data.models = models;
        }
        if(Object.keys(sharedFolders).length>0){
            data.sharedFolders = sharedFolders;
        }

        data.owner = owner;
        data.req_type = 'delete Folder';
        console.log(data);
        $.post('sites/all/modules/_custom/NC_models/static/nonClassUpdates.php', data)
            .success(function (datum) {
                //console.log("received",datum);
                location.reload();
         });
         
    });
});