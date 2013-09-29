
MusicTab.namespace('MusicTab.Utils');

MusicTab.Utils.FileReader = klass(null, {
    __construct: function () {
		this.init();
    },

    init: function () {
	},
	
	read: function(file, success, error){
		// chrome & FF
		if( typeof FileReader === 'function'){
			this._readAllBytes(file, success, error);
		} 
		// IE
		else if(typeof ActiveXObject=== 'function'){
			this._readAllBytesIE(file, success, error);

		}
	},
	
	_readAllBytes: function(path, success, error){
		var reader = new FileReader();
		reader.onloadend = function(evt) {
		  if (evt.target.readyState == FileReader.DONE) { 
		  // TODO avoid conversion
			var result = evt.target.result;
			var array = [];
			for (n = 0; n < result.length; ++n) {
				array.push(result.charCodeAt(n));
			}
			success(array);
		  } 
		  else 
			error();
		};
		var blob = path.slice(0, path.size);
		reader.readAsBinaryString(blob);
	},
	
	 _readAllBytesIE: function(path, success, error) {
        var fso = new ActiveXObject("Scripting.FileSystemObject"),
            ts = fso.OpenTextFile(path, 1), array = [];
        while (!ts.AtEndOfStream)
            array.push(ts.Read(1).charCodeAt(0));

        ts.Close();
		success(array);
    }
	
	/*getBinaryFromXHR: function(responseText, xhr) {
        var result = "";
        for (var i = 0; i < responseText.length; i++) {
            var code = responseText.charCodeAt(i) & 0xff;
            result += String.fromCharCode(code);
        }
        return result;
    },*/
	
});