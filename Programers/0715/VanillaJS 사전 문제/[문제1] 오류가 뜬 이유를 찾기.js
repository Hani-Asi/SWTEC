function RockBand(members) {
    this.members = members;
    this.perform = function() {
      setTimeout(function() {
        this.members.forEach(function(member){
          member.perform();
        })
      }, 1000)
    }
  }
  
  var theOralCigarettes = new RockBand([
    {
      name: 'takuya',
      perform: function() {
        console.log('Sing: a e u i a e u i')
      }
    }
  ]);
  
  theOralCigarettes.perform();