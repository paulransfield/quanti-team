import "Team.sol";
import "SequenceList.sol";

contract TeamManager {
    SequenceList teamsList = new SequenceList();

    event ActionEvent(address indexed userAddr, bytes32 actionType);
    function registerActionEvent(bytes32 actionType) {
      ActionEvent(msg.sender, actionType);
    }

    function addTeam(
        bytes32 _id,
        bytes32 _name,
        bytes32 _founderUsername,
        address _founderAddress)
        returns (address)
        {
            registerActionEvent("ADD TEAM");
            // return null address if team name already present
            if (teamsList.exists(_name)) {
                return 0x0;
            }
            Team tm = new Team (_id, _name, _founderUsername, _founderAddress);
            return tm;
    }

    function addTeamMember(address _teamAddr, bytes32 _username, address _userAddr) returns (bool isOverwrite) {
        registerActionEvent("ADD TEAM MEMBER");
        isOverwrite = Team(_teamAddr).addMember(_username, _userAddr);
    }

    function removeTeamMember(address _teamAddr, bytes32 _username) returns (bool isOverwrite) {
        registerActionEvent("REMOVE TEAM MEMBER");
        isOverwrite = Team(_teamAddr).removeMember(_username);
    }

    function getMemberAtIndex(address _teamAddr, uint idx) returns (address, uint) {
        return Team(_teamAddr).getMemberAtIndex(idx);
    }
}
