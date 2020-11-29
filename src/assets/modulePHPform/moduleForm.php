<?
	header('Access-Control-Allow-Origin: *');
	header("Content-type: text/html; charset=utf-8");

	include('libmail.php');

	//- SETTINGS
	$serverEmail	= 'dyks@priorbank.by';
	$serverEmailArr	= array('dyks@priorbank.by');

	$isCCGMS 		= true;
	$isMail 		= true;

	$smtp_server	= '';
	$smtp_login		= '';
	$smtp_password	= '';
	$smtp_port		= 25;
	$smtp_timeout	= 5;

	$path_log 		= $_SERVER['DOCUMENT_ROOT'].'/log.txt';

	//- POST DATA

	$vName		= filter_input(INPUT_POST, 'fieldName', FILTER_SANITIZE_STRING);
	$vPhone		= filter_input(INPUT_POST, 'fieldPhone', FILTER_SANITIZE_STRING);

	if(!$vName){
		exit;
	}
	if(!$vPhone){
		exit;
	}

	//-

	$message 		= "";
	$message 		.= "Лид по Корпоративным картам<br />";
	$message 		.= "Имя: " .$vName."<br />";
	$message 		.= "Телефон: " .$vPhone."<br />";

	$aName = explode(" ", $vName);
	while (count($aName)<2) {
		array_push($aName, "");
	}

	//- SAVE LOG

	SaveLog($path_log, "Заказ звонка: ".$vName." | ".$vPhone);

	//- CCGMS SERVICE

	if($isCCGMS AND $vName != "test"){

		$vProcessedPhone = preg_replace("/\s+/", '', $vPhone);
		$vProcessedPhone = str_replace("+375", '80', $vProcessedPhone);
		$vProcessedPhone = preg_replace("/[^0-9]/", '', $vProcessedPhone);

		$postData = array(
			'_call_direction' 	=> 'USERTERMINATED',
			'subject' 			=> 'Лендинг',
			'firstname' 		=> $aName[1],
			'lastname' 			=> $aName[0],
			'_customer_number' 	=> $vProcessedPhone
		);

		$ch = curl_init('https://ccgms.priorbank.by/genesys/1/service/callback/lending');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec ($ch);
		curl_close ($ch);

		//- SAVE LOG

		SaveLog($path_log, "CCGMS | ".$response);

		// CHECK FOR ERRORS

		$response = json_decode($response);

		if($response == FALSE OR $response->{'phrase'} == "BAD_PARAMETER"){

			$statusCallbackService = "error";

		}else{

			$statusCallbackService = "success";

		}

	}else{

		$statusCallbackService = "off";

	}

	//- MAIL

	if($isMail){

		$m= new Mail;
		$m->From( $vName."; ".$serverEmail );
		$m->To( $serverEmailArr );
		$m->Subject( "Лид по зарплатному проекту [".$vName."]" );
		$m->Body( $message, "html");
		$m->Priority(2);
		if($smtp_server!=""){
			$m->smtp_on($smtp_server, $smtp_login, $smtp_password, $smtp_port, $smtp_timeout);
		}
		$m->log_on(true);

		//- Sending message

		if(!$m->send()) {

			$statusMail = "error";

		}else{

			$statusMail = "success";

		}

		//- SAVE LOG

		SaveLog($path_log, "Mail | ".$m->status_mail['message']);

	}else{

		$statusMail = "off";

	}

	//- RESULT

	if($statusCallbackService == "success" OR $statusMail == "success"){

		$status = "success";

	}else{

		$status = "error: statusCallbackService = ".$statusCallbackService.", statusMail = ".$statusMail;

	}

	echo $status;

	//--------------------------------------------------------------

	function SaveLog($path, $log){
		$log = "\n".date('Y-m-d H:i:s').'  '.$log;
		file_put_contents($path, iconv('utf-8', 'windows-1251', $log), FILE_APPEND);
	}

?>
