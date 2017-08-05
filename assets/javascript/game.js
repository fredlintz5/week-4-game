$(document).ready(function() {
	
	var obiID = $("#obi");
	var lukeID = $("#luke");
	var sidID = $("#sidious");
	var maulID = $("#maul");
	var selectedCharacter;
	var selectedOpponent;
	var obi = {selected: false, hp: 120, attack: 8, counter: 10};
	var luke = {selected: false, hp: 100, attack: 6, counter: 12};
	var sid = {selected: false, hp: 150, attack: 10, counter: 8};
	var maul = {selected: false, hp: 180, attack: 12, counter: 15};



initialGameplay();
initialFight();












	

	// Magical Functions Below...

	function initialGameplay() {
		characterSelect(lukeID, "Good Luke", luke, true);
		characterSelect(sidID, "Good Sidious", sid, true);
		characterSelect(obiID, "Good Obi", obi, true);
		characterSelect(maulID, "Good Maul", maul, true);
	}

	function characterSelect(id, name, object, bool) {
		id.click(function() {

			if (selectedCharacter === undefined) {
				selectedCharacter = name;
				object.selected = bool;
			}

			$("#choose h2").html("Choose your Opponent");
			$("#choose div").css("margin-left", "10%");
			$("#battleground").prepend(id);
			opponentSelect(lukeID, "Evil Luke");
			opponentSelect(sidID, "Evil Sidious");
			opponentSelect(obiID, "Evil Obi");
			opponentSelect(maulID, "Evil Maul");
		});
	}

	function opponentSelect(id, name) {
		id.click(function() {
			selectedOpponent = name;
			$("#choose").css("display", "none");
			$("#battleground").css("display", "inherit");
			$("#battleground").css("margin-top", "9%");
			$("#battleground div").css("margin-left", "10%");
			$("#battleground").append(id);
			removeClickHandler(obiID);
			removeClickHandler(lukeID);
			removeClickHandler(sidID);
			removeClickHandler(maulID);
		});
	}


	function initialFight() {
		fight("Good Obi", "Evil Luke", luke, obi, "#lukeHP", "#obiHP");
		fight("Good Obi", "Evil Sidious", sid, obi, "#sidHP", "#obiHP");
		fight("Good Obi", "Evil Maul", maul, obi, "#maulHP", "#obiHP");
		fight("Good Luke", "Evil Obi", obi, luke, "#obiHP", "#lukeHP");
		fight("Good Luke", "Evil Sidious", sid, luke, "#sidHP", "#lukeHP");
		fight("Good Luke", "Evil Maul", maul, luke, "#maulHP", "#lukeHP");
		fight("Good Sidious", "Evil Obi", obi, sid, "#obiHP", "#sidHP");
		fight("Good Sidious", "Evil Luke", luke, sid, "#lukeHP", "#sidHP");
		fight("Good Sidious", "Evil Maul", maul, sid, "#maulHP", "#sidHP");
		fight("Good Maul", "Evil Luke", luke, maul, "#lukeHP", "#maulHP");
		fight("Good Maul", "Evil Sidious", sid, maul, "#sidHP", "#maulHP");
		fight("Good Maul", "Evil Obi", obi, maul, "#obiHP", "#maulHP");
	}

	function fight(charName, oppName, oppObj, charObj, oppHPdiv, charHPdiv ) {
		$("#button").click(function() {	
			if (selectedCharacter === charName && selectedOpponent === oppName) {
				oppObj.hp -= charObj.attack;
				charObj.hp -= oppObj.counter;
				$(oppHPdiv).html("HP:" + oppObj.hp);
				$(charHPdiv).html("HP:" + charObj.hp);
				checkScore();
			} 
		})
	};

	function checkScore() {
		initialCheckScore(obi, luke);
		initialCheckScore(obi, sid);
		initialCheckScore(obi, maul);
		initialCheckScore(luke, obi);
		initialCheckScore(luke, sid);
		initialCheckScore(luke, maul);
		initialCheckScore(sid, luke);
		initialCheckScore(sid, obi);
		initialCheckScore(sid, maul);
		initialCheckScore(maul, luke);
		initialCheckScore(maul, obi);
		initialCheckScore(maul, sid);
	}

	function initialCheckScore(char, opp) {
		if (char.selected === true && char.hp === 0) {
			setTimeout(function(){ 
				alert("you died"), 1000;
			})
			removeClickHandler($("#button"));
			location.reload();
		} else if (opp.selected === true && opp.hp === 0) {
			setTimeout(function(){ 
				alert("you won!"), 1000;
			})
			removeClickHandler($("#button"));
			location.reload();
		}
	}

	function removeClickHandler(id) {
		id.prop('onclick',null).off('click');
	}

});











