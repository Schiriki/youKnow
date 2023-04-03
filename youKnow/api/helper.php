<?php
    class Helper{
        public function getQuery($param) {
            switch($param){
                case "clientsTime":
                    $sql = "SELECT tmp.name as `Mandant`, SUM(tmp.time) AS `Systemzeit` 
                            FROM (
                                SELECT benutzer.id, benutzer.mandant, mandanten.name as `name`, TIMESTAMPDIFF(SECOND,logs.startdate, logs.enddate) AS `time` 
                                FROM `benutzer` 
                                INNER JOIN `mandanten` ON benutzer.mandant = mandanten.id 
                                LEFT JOIN `logs` ON benutzer.id = logs.user_id
                                WHERE logs.startdate >= :startDate
                                AND logs.enddate <= :endDate
                                HAVING `time` >0) 
                            AS tmp 
                            GROUP BY tmp.name";
                    
                    return $sql;
                break;
                case "clientsUser":
                    $sql = "SELECT mandanten.name as `Mandant`, GROUP_CONCAT(benutzer.name) as `Benutzer` 
                            FROM mandanten 
                            LEFT JOIN benutzer 
                            ON mandanten.id = benutzer.mandant 
                            GROUP BY mandanten.name, mandanten.id";
                    
                    return $sql;
                break;
                case "clientsUserTime":
                    $sql = "SELECT tmp.name as `Mandant`, tmp.username as `Benutzername`, SUM(tmp.time) AS `Systemzeit`
                            FROM (
                                SELECT mandanten.name as `name`, benutzer.id, benutzer.name as `username`, TIMESTAMPDIFF(SECOND,logs.startdate, logs.enddate) AS `time` 
                                FROM `mandanten`
                                INNER JOIN `benutzer` ON mandanten.id = benutzer.mandant
                                LEFT JOIN `logs` ON benutzer.id = logs.user_id
                                WHERE mandanten.name = :client
                                AND logs.startdate >= :startDate
                                AND logs.enddate <= :endDate
                                HAVING `time` >0)
                            AS tmp
                            GROUP BY tmp.name, tmp.username";
                    
                    return $sql;
                break;
                case "inactiveClients":
                    $sql = "SELECT mandanten.name as `Mandant`
                            FROM `mandanten` 
                            WHERE active = 0";
                    
                    return $sql;
                break;
            }
        }
    }
?>