function RockBand(members) {
    this.members = members;
    this.perform = funciton() {
        setTimeout(function() {
            this.members.forEach(function(members) {
                members.perform();
            })
        }, 1000)
    }
}

var theOralCigarettes = new RockBand([
    {
        name: 'takuya',
        perform: function() {
            console.log('sing: a e u i a e u i')
        }
    }
]);

theOralCigarettes.perform();