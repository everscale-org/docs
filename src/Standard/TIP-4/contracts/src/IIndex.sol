pragma ton-solidity >= 0.58.0;

interface IIndex {
    function getInfo() external view responsible returns (
        address collection,
        address owner,
        address nft
    );
    function destruct(address gasReceiver) external;
}