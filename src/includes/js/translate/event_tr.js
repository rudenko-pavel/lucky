/************** EVENT:id - start  *************/
    /************** translate info start  *************/
    var infoEvent = function(){

        var dataInfo = "";
        $.elephantLanguage = localStorage.getItem('elLang');
        var nameEvent="name-"+$.elephantLanguage;
        var descriptionsEvent="descriptions-"+$.elephantLanguage;

        dataInfo = dataInfo + "<h5>"+$.eventInfo[nameEvent]+"</h5>";
        dataInfo = dataInfo + "<div class='niceDate'>"+$.eventInfo["runDate"]+"</div>";
        dataInfo = dataInfo + "<div>"+$.eventInfo[descriptionsEvent]+"</div>";

        $("#eventInfo").html(dataInfo);
    }
    /************** translate info end    *************/
/************** EVENT:id -  end    *************/