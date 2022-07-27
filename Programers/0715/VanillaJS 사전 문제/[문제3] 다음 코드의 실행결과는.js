var idiots = {
    name: 'idiots',
    genre: 'punk rock',
    members: {
        roto: {
            memberName: 'roto',
            play: function() {
                console.log(`band ${this.name} ${this.memberName} play start`)
            }
        }
    }
}

idiots.members.roto.play();