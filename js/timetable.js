var day_start = 60 * 8; // = 8:00
var day_end = 60 * 22; // = 20:00

var height = 800;


function timestr_to_pos (timestring) {
	var match = timestring.match(/(\d+):(\d+)/);
	
	var mins = 60 * parseInt(match[1]) + parseInt(match[2]);
	mins -= day_start;
	mins /= day_end - day_start;	

	return mins;
}

function timestr_to_length (str1, str2)  {
	var match1 = str1.match(/(\d+):(\d+)/);
	var match2 = str2.match(/(\d+):(\d+)/);

	mins1 = 60 * parseInt(match1[1]) + parseInt(match1[2]);
	mins2 = 60 * parseInt(match2[1]) + parseInt(match2[2]);

	return (mins2 - mins1) / (day_end - day_start);		
}

function reposition_lessons () {
	$(".tt_lesson").each(function() {
		$(this).css('top', timestr_to_pos($("time.from", this).text()) * height + "px");
		$(this).css('height', timestr_to_length(
				$("time.from", this).text(),
				$("time.to", this).text()
			) * height + "px");
	});

	$(".tt_lesson").click(function () {
		$(this).remove();
	});
}


$(function() {

	$("#timetable").load("timetable.htm", function () {
		
		$('#inputName').focus(function() {
			this.select();
		});

		$('#lessonSubmit').click(function () {
			$('#tt_' + $('#inputDay').val() + ' .tt_lessons').append(
				$('<div class="tt_lesson">')
					.append($('<h2>').text($('#inputName').val()))
					.append($('<time class="from">').text($('#inputFrom').val()))
					.append($('<time class="to">').text($('#inputTo').val()))
					.append($('<span class="location">').text($('#inputLocation').val()))
			);
			$('#inputName').get(0).focus();

			reposition_lessons();

			return false;
		})
		$('#lessonForm').submit(function () {return false});
						

		$('#tt_container').css('height', (height + 70) + "px");
		$('#tt_container .tt_day').each(function () {
			$(this).append($('<div class="tt_lessons">'));
		});
						
		// Position time legend
		$(".tt_times time").each(function() {
			$(this).css('top', timestr_to_pos($(this).text()) * height + "px");
		});

		reposition_lessons();


	});
 
})
