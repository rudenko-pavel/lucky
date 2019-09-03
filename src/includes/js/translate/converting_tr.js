/************** CONVERTING - start  *************/
    /************** translate info start  *************/

    var convertingText = function(){

        $.convertingDictionary = {
            "en": {
                "_firstInput"   : "Input `a-f A-F 0-9`",
                "_secondtInput" : "After conversion",
            },
            "ua": {
                "_firstInput"   : "Допустимі значення: `a-f A-F 0-9`",
                "_secondtInput" : "Після перетворення",
            }
        };
        $.elephantLanguage = localStorage.getItem('elLang');

        var forFirstDigit = $.convertingDictionary[$.elephantLanguage]["_firstInput"];
        var forSecondDigit = $.convertingDictionary[$.elephantLanguage]["_secondtInput"];

        $("#forFirstDigit").html(forFirstDigit);
        $("#forSecondDigit").html(forSecondDigit);
    }

    var initDatePicker = function(){
        $.convertingDictionary = {
            "en": {
                "_selectDate"   : "Select a date:",
                "_resultDate"   : "Date:"
            },
            "ua": {
                "_selectDate"   : "Виберіть дату:",
                "_resultDate"   : "Дата:"
            }
        };
        $.elephantLanguage = localStorage.getItem('elLang');
        $.getJSON( "dist/includes/json/datepicker."+$.elephantLanguage+".json", function( data ) {

        $("#wrapPrefill").html('<input type="text" id="prefill" class="datepicker"><label for="prefill" class="full-label" id="selectDate"></label>');
        var selectDate = $.convertingDictionary[$.elephantLanguage]["_selectDate"];
        var resultDate = $.convertingDictionary[$.elephantLanguage]["_resultDate"];
        $("#selectDate").html(selectDate);
        $("#resultDate").html(resultDate);
        $('#prefill').pickadate({
              monthsFull: data.monthsFull, monthsShort:  data.monthsShort, weekdaysFull:  data.weekdaysFull, weekdaysShort:  data.weekdaysShort, weekdaysLetter: data.weekdaysLetter,
              today:  data.today, clear:  data.clear, close:  data.close,
              labelMonthNext: data.labelMonthNext, labelMonthPrev: data.labelMonthPrev, labelMonthSelect: data.labelMonthSelect, labelYearSelect: data.labelYearSelect,
              selectYears: true, selectMonths: true, firstDay: 1, format: 'yyyy-mm-dd'
          
            });
        
        });
    }
    /************** translate info end    *************/
/************** CONVERTING -  end    *************/