<?php

/**
 * Database Connection
 * For this test excersize, I did not change the default user & pass
 * Normally, that MUST be changed for secrurity reasons
 */

 class DbConnect {
    private $server = 'localhost';
    private $dbname = 'youKnow';
    private $user = 'root';
    private $pass = 'root';

    public function connect(){
        try{
            $conn = new PDO('mysql:host=' .$this->server .';dbname=' .$this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e){
            echo "Database Error: " . $e->getMessage();
        }
    }
 }