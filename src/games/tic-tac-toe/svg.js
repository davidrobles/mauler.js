(function() {

    // Base size used for drawing is 1000 pixels
    var TicTacToeSVGView = function(options) {
        this.model = options.model;
        // provide either a SVG or a G element
        // if nothing is provided, create a SVG
        this.svg = options.svg || document.createElement("svg");
        //this.sideLength = parseInt(this.svg.getAttribute("width"));

        this.sideLength = 60;

        d3.select(this.svg)
            .attr("width", this.sideLength)
            .attr("height", this.sideLength);

        this.svg = d3.select(this.svg).append("g");
        this.svg.attr("transform", "scale(1.0)");

        this.colors = {
            bg: "rgb(255, 219, 122)",
            border: "rgb(229, 197, 110)",
            cross: "rgba(231, 76, 60, 1.0)",
            crossLight: "rgba(231, 76, 60, 0.5)",
            nought: "rgba(41, 128, 185,1.0)",
            noughtLight: "rgba(41, 128, 185, 0.5)"
        };

        this.lineWidth = this.sideLength * 0.02;
        this.borderWidth = this.sideLength * 0.04;
        this.render();
    };

    TicTacToeSVGView.squareToMove = function(row, col) {
        return mauler.games.tic.letters[row] + (col + 1);
    };

    TicTacToeSVGView.prototype.render = function() {
        this.drawBackgroundAndBorder();
        this.drawLines();
        this.drawSquares();
        return this;
    };

    TicTacToeSVGView.prototype.drawBackgroundAndBorder = function() {
        this.svg.append("rect")
            .attr({
               "x": 0,
               "y": 0,
               "width": this.sideLength,
               "height": this.sideLength,
               "fill": this.colors.bg,
               "stroke": this.colors.border,
               "stroke-width": this.borderWidth
            });
    };

    TicTacToeSVGView.prototype.drawLines = function() {
        for (var i = 1; i < this.model.size; i++) {
            this.drawVerticalLine(i);
            this.drawHorizontalLine(i);
        }
    };

    TicTacToeSVGView.prototype.drawHorizontalLine = function (row) {
        this.svg.append("line")
            .attr("x1", 0)
            .attr("y1", (this.sideLength / 3) * row)
            .attr("x2", this.sideLength)
            .attr("y2", (this.sideLength / 3) * row)
            .attr("stroke", this.colors.border)
            .attr("stroke-width", this.lineWidth);
    };

    TicTacToeSVGView.prototype.drawVerticalLine = function (col) {
        this.svg.append("line")
            .attr("x1", (this.sideLength / 3) * col)
            .attr("y1", 0)
            .attr("x2", (this.sideLength / 3) * col)
            .attr("y2", this.sideLength)
            .attr("stroke", this.colors.border)
            .attr("stroke-width", this.lineWidth);
    };

    TicTacToeSVGView.prototype.drawSquares = function() {
        for (var row = 0; row < this.model.size; row++) {
            for (var col = 0; col < this.model.size; col++) {
                var cellType = this.model.cell(row, col);
                if (cellType === 'CROSS') {
                    this.drawCross(row, col, this.colors.cross);
                } else if (cellType === 'NOUGHT') {
                    this.drawCross(row, col, this.colors.nought);
                }
            }
        }
    };

    // Fix this
    TicTacToeSVGView.prototype.drawCross = function (row, col, color) {

        var scale = d3.scale.ordinal().domain([0, 1, 2]).rangeRoundBands([0, this.sideLength], 1, 0.5);

        this.svg
            .append("circle")
            .attr("class", "test")
            .attr("cx", function() {
                return scale(col);
            })
            .attr("cy", function() {
                return scale(row);
            })
            .attr("r", this.sideLength * 0.1)
            .attr("fill", color);
    };

    TicTacToeSVGView.prototype.update = function(event, model) {
        this.model = model;
        this.render();
    };

    mauler.games.tic = mauler.games.tic || {};
    mauler.games.tic.TicTacToeSVGView = TicTacToeSVGView;

})();