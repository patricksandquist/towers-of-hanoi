(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = window.Hanoi.View = function(game, $el) {
    this.$el = $el;
    this.game = game;
    this.setupStacks();
    this.bindEvents();
    this.firstTower = undefined;
  };

  View.prototype.bindEvents = function() {
    var that = this;
    // this.$el.on("click", function($event) {
    $('ul ul').on("click", function($event) {
      console.log("click!");
      var tower = $($event.currentTarget);
      console.log(tower);
      that.clickTower(tower);
    });
  };

  View.prototype.clickTower = function(tower) {
    if(typeof this.firstTower === 'undefined') {
      this.firstTower = tower.attr("id").slice(2);
      console.log("first tower: "+this.firstTower);

    }
    else {
      this.moveTowers(this.firstTower, tower.attr("id").slice(2));
    }
  };

  View.prototype.moveTowers = function(first, second) {
    // first = 2-first;
    // second = 2-second;

    console.log("First is "+first+" and second is "+second);
    this.firstTower = undefined;

    var valid = this.game.move(first, second);
    if (valid) {
      var id = $("#ul" + first).children().last().attr("id").slice(2);
      console.log("Id of list is "+id);
      // use $.eq(idx) to grab the idxth child
      // in your render method start from the bottom
      $("#ul" + first).children().last().remove();
      $("#ul" + second).append($("<li>"));
      $("#ul" + second).children().last().attr("id", "li" + id);
      if (this.game.isWon()) {
        $('ul ul').off();
        $("body").append("<h1>YOU WON</h1>");
        $("ul ul").addClass("over");
      }
    } else {
      alert("BAD MOVE, SIR");
    }
  };

  View.prototype.setupStacks = function() {
    var list = this.$el;

    console.log(list);
    for (var i = 0; i < 3; i++) {
      list.append($('<ul>'));
    }

    list.children().each(function(index) {
      $(this).attr("id", "ul" + index);
    });

    for(var j=0; j<3; j++) {
      $("#ul0").append($('<li>'));
    }

    $("#ul0").children().each(function(index){
      index = 2 - index;
      $(this).attr("id", "li" + index);
    });

    return list;
  };

})();
