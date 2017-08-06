$(document).ready(function() {
	

	var obiID = $("#obi");
	var lukeID = $("#luke");
	var sidID = $("#sidious");
	var maulID = $("#maul");
	var selectedCharacter;
	var selectedOpponent;
	var obi = {selChar: false, selOpp: false, hp: 130, attack: 10, newAttack: 10, counter: 18};
	var luke = {selChar: false, selOpp: false, hp: 100, attack: 10, newAttack: 10, counter: 15};
	var sid = {selChar: false, selOpp: false, hp: 150, attack: 12, newAttack: 12, counter: 20};
	var maul = {selChar: false, selOpp: false, hp: 180, attack: 14, newAttack: 14, counter: 20};


	// Magical Functions Below...

	function initialGameplay() {
		characterSelect(lukeID, "Good Luke", luke, true);
		characterSelect(sidID, "Good Sidious", sid, true);
		characterSelect(obiID, "Good Obi", obi, true);
		characterSelect(maulID, "Good Maul", maul, true);
	}
	initialGameplay();


	function characterSelect(id, name, object, bool) {
		id.click(function() {

			if (selectedCharacter === undefined) {
				selectedCharacter = name;
				object.selChar = bool;
			}

			$("#choose h2").html("Choose your Opponent");
			$("#choose div").css("margin-left", "10%");
			$("#battleground").prepend(id);
			opponentSelect(lukeID, "Evil Luke", luke, true);
			opponentSelect(sidID, "Evil Sidious", sid, true);
			opponentSelect(obiID, "Evil Obi", obi, true);
			opponentSelect(maulID, "Evil Maul", maul, true);
		});
	}


	function opponentSelect(id, name, object, bool) {
		id.click(function() {
			selectedOpponent = name;
			object.selOpp = bool;
			$("#choose").css("display", "none");
			$("#battleground").css("display", "inherit");
			$("#battleground").css("margin-top", "9%");
			$("#battleground div").css("margin-left", "10%");
			$("#battleground").append(id);
		});
	}


	function initialFight() {
		fight("Good Obi", "Evil Luke", luke, obi, "#lukeHP", "#obiHP", "#obiAtt");
		fight("Good Obi", "Evil Sidious", sid, obi, "#sidHP", "#obiHP", "#obiAtt");
		fight("Good Obi", "Evil Maul", maul, obi, "#maulHP", "#obiHP", "#obiAtt");
		fight("Good Luke", "Evil Obi", obi, luke, "#obiHP", "#lukeHP", "#lukeAtt");
		fight("Good Luke", "Evil Sidious", sid, luke, "#sidHP", "#lukeHP", "#lukeAtt");
		fight("Good Luke", "Evil Maul", maul, luke, "#maulHP", "#lukeHP", "#lukeAtt");
		fight("Good Sidious", "Evil Obi", obi, sid, "#obiHP", "#sidHP", "#sidAtt");
		fight("Good Sidious", "Evil Luke", luke, sid, "#lukeHP", "#sidHP", "#sidAtt");
		fight("Good Sidious", "Evil Maul", maul, sid, "#maulHP", "#sidHP", "#sidAtt");
		fight("Good Maul", "Evil Luke", luke, maul, "#lukeHP", "#maulHP", "#maulAtt");
		fight("Good Maul", "Evil Sidious", sid, maul, "#sidHP", "#maulHP", "#maulAtt");
		fight("Good Maul", "Evil Obi", obi, maul, "#obiHP", "#maulHP", "#maulAtt");
	}
	initialFight();


	function fight(charName, oppName, oppObj, charObj, oppHPdiv, charHPdiv, charAttdiv) {
		$("#button").click(function() {	
			if (selectedCharacter === charName && selectedOpponent === oppName) {
				oppObj.hp -= charObj.newAttack;
				charObj.newAttack += charObj.attack;
				charObj.hp -= oppObj.counter;
				$(oppHPdiv).html("HP:" + oppObj.hp);
				$(charHPdiv).html("HP:" + charObj.hp);
				$(charAttdiv).html("Attack:" + charObj.newAttack);
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
		if (char.selChar === true && opp.hp < 1) {

			alert("You won, next enemy...");

			function reset() {
				selectedOpponent = "";

				if (obi.selChar === true) {
					luke = {selChar: false, selOpp: false, hp: 100, attack: 6, newAttack: 6, counter: 15};
					sid = {selChar: false, selOpp: false, hp: 150, attack: 10, newAttack: 10, counter: 20};
					maul = {selChar: false, selOpp: false, hp: 180, attack: 12, newAttack: 12, counter: 20};
				} else if (luke.selChar === true) {
					obi = {selChar: false, selOpp: false, hp: 130, attack: 8, newAttack: 8, counter: 18};
					sid = {selChar: false, selOpp: false, hp: 150, attack: 10, newAttack: 10, counter: 20};
					maul = {selChar: false, selOpp: false, hp: 180, attack: 12, newAttack: 12, counter: 20};
				} else if (sid.selChar === true) {
					obi = {selChar: false, selOpp: false, hp: 130, attack: 8, newAttack: 8, counter: 18};
					luke = {selChar: false, selOpp: false, hp: 100, attack: 6, newAttack: 6, counter: 15};
					maul = {selChar: false, selOpp: false, hp: 180, attack: 12, newAttack: 12, counter: 20};
				} else if (maul.selChar === true) {
					obi = {selChar: false, selOpp: false, hp: 130, attack: 8, newAttack: 8, counter: 18};
					luke = {selChar: false, selOpp: false, hp: 100, attack: 6, newAttack: 6, counter: 15};
					sid = {selChar: false, selOpp: false, hp: 150, attack: 10, newAttack: 10, counter: 20};
				}	
			}
			reset();

			function roundTwo() {
				$("#battleground").css("display", "none");
				$("#choose").css("display", "inherit");
				$("#choose h2").html("Choose your Next Opponent");
				$("#battleground div").last().remove();
				opponentSelect(lukeID, "Evil Luke", luke, true);
				opponentSelect(sidID, "Evil Sidious", sid, true);
				opponentSelect(obiID, "Evil Obi", obi, true);
				opponentSelect(maulID, "Evil Maul", maul, true);		
			}
			roundTwo();
			initialFight();
			
		} else if (opp.selOpp === true && char.hp < 1) {
			alert("You died, The force is weak with you.");
			location.reload();			
		}
	}


}); 

	function gameWin() {
		if (obi.selChar === true && sid.hp < 1 && luke.hp < 1 && maul.hp < 1) {
			alert("You saved the Galaxy, Thank You.");
			location.reload();
		} else if (luke.selChar === true && sid.hp < 1 && obi.hp < 1 && maul.hp < 1) {
			alert("You saved the Galaxy, Thank You.");
			location.reload();
		} else if (sid.selChar === true && luke.hp < 1 && obi.hp < 1 && maul.hp < 1) {
			alert("You saved the Galaxy, Thank You.");
			location.reload();
		} else if (maul.selChar === true && sid.hp < 1 && obi.hp < 1 && maul.hp < 1) {
			alert("You saved the Galaxy, Thank You.");
			location.reload();
		}
	}











