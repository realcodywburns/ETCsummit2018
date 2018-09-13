pragma solidity 0.4.20;


contract iot{

    address public owner;

    enum state {
        off,
        on
    }

    state public deviceState_1;

    event alert(string _alert);

    function lightOn() public returns(bool success){
        deviceState_1 = state.on;
        alert("device turned on");
        return true;
    }

    function lightOff() public returns(bool success){
        deviceState_1 = state.off;
        alert("device turned off");
        return true;
    }

    function () public {assert (false);}
}
