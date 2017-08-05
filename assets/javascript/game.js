$(document).ready(function() {
	
	var obi = $("#obi");
	var luke = $("#luke");
	var sid = $("#sidious");
	var maul = $("#maul");
	var selectedCharacter;
	var selectedOpponent;



	characterSelect(luke, "Good Luke");
	characterSelect(sid, "Good Sidious");
	characterSelect(obi, "Good Obi");
	characterSelect(maul, "Good Maul");
	

	// Magical Function Below...

	function characterSelect(id, name) {
		id.click(function() {

			if (selectedCharacter === undefined) {
				selectedCharacter = name;
			}

			$("#choose h4").html("Choose your Opponent");
			$("#choose div").css("margin-left", "10%");
			$("#battleground").append(id);
			opponentSelect(luke, "Evil Luke");
			opponentSelect(sid, "Evil Sidious");
			opponentSelect(obi, "Evil Obi");
			opponentSelect(maul, "Evil Maul");
		});
	}

	// Magical Function Below...

	function opponentSelect(id, name) {
		id.click(function() {
			selectedOpponent = name;
			$("#choose").css("display", "none");
			$("#battleground").css("display", "inherit");
			$("#battleground div").css("margin-left", "10%");
			$("#battleground").append("<div id='button'>Attack</div");
			$("#battleground").append(id);
			removeClickHandler(obi);
			removeClickHandler(luke);
			removeClickHandler(sid);
			removeClickHandler(maul);
		});
	}

	// Magical Function Below...

	function removeClickHandler(id) {
		id.prop('onclick',null).off('click');
	}




});




