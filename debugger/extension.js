// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
//const child = require('child_process');
const axios = require('axios');
//const request = require('request');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "debugger" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json 
	let disposable = vscode.commands.registerCommand('debugger.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Debugger!');
	});


	let disposable2 = vscode.commands.registerCommand("extension.getDocument", function () {
		
		const editor = vscode.window.activeTextEditor;
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification
			//cancellable: false,
		}, async (progress) => {

			progress.report({
				message: `Predicting`,
			});

			async function postCode(){
				if (editor){
					let document = editor.document;
		
					const content = document.getText();
					console.log(content)
					if (content == ""){
						vscode.window.showErrorMessage('Please open your code file first!');

					}
					else {
						const url = "http://127.0.0.1:8000/bug-detection?title=" + content;
				  
						await axios({
							method: 'POST',
							url, 
							headers:{'Content-Type': 'application/json; charset=utf-8'}
						}) 
							.then((res) => {
							console.log(`statusCode: ${res.status}`)
							console.log(res.data)
							console.log(JSON.stringify(res.data['title_r']))
							vscode.window.showInformationMessage(res.data['title_r']);
							})
							.catch((error) => {
							console.error(error)
							})

					}
					
				}
			}
			await postCode();
			//await Promise.resolve();
		
			progress.report({ increment: 100 });
		});





		//vscode.window.showInformationMessage('Document !');
		/*
		let payload = { "title": 'John Doe', "content": 'test1231231' };
		axios.post('http://127.0.0.1:8000/test_post', payload)
		.then(response =>  {
			//vscode.window.showInformationMessage("asdada");
			//vscode.window.showInformationMessage("Data:" + JSON.stringify(response.data));
			console.log(response.data);
		})
		*/

		/*
		axios.get('http:127.0.0.1:8000/items/12')
		.then(response =>  {
			vscode.window.showInformationMessage("asdada");
			vscode.window.showInformationMessage("Data:" + JSON.stringify(response.data));
			console.log(response.data);
			//console.log(response.data.url);
			//console.log(response.data.explanation);
		})
		.catch(error => {
			console.log(error);
		});
		*/
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
